<template>
    <b-modal :active.sync="showModalAdd" has-modal-card full-screen :can-cancel="true">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Добавить объект</p>
          <a aria-label="close" @click="showModalAdd = false">
            <span class="icon is-small"><i class="fas fa-times"></i></span>
          </a>
        </header>
        <section class="modal-card-body">

          <form novalidate @submit.prevent="onSubmit">
            <div class="field is-grouped">

                <div class="control is-expanded">
                  <label class="label">Изготовитель</label>
                  <input class="input" type="text" v-model="manufacturer" ref="manufacturer_ref" name="manufacturer" />
                  <p v-for="(error, index) in manufacturer_errors" :key="index">
                    {{ error }}
                  </p>
                </div>

                <div class="control is-expanded">
                  <label class="label">Номер объекта</label>
                  <input class="input" type="text" v-model="serial" ref="serial_ref" name="serial" />
                  <p v-for="(error, index) in serial_errors" :key="index">
                    {{ error }}
                  </p>
                </div>

                <div class="control is-expanded">
                  <label class="label">Год изготовления</label>
                  <input class="input" type="text" v-model="year_build" ref="year_build_ref" name="year_build" />
                  <p v-for="(error, index) in year_build_errors" :key="index">
                    {{ error }}
                  </p>
                </div>
            </div>

              <div class="field is-grouped">

                  <div class="control is-expanded">
                      <label class="label">Собственник</label>
                      <input class="input" type="text" v-model="owner" ref="owner_ref" name="owner" />
                      <p v-for="(error, index) in owner_errors" :key="index">
                          {{ error }}
                      </p>
                  </div>

                  <div class="control is-expanded">
                      <label class="label">Расположение</label>
                      <input class="input" type="text" v-model="locat" ref="locat_ref" name="locat" />
                      <p v-for="(error, index) in locat_errors" :key="index">
                          {{ error }}
                      </p>
                  </div>

                  <div class="control is-expanded">
                      <label class="label">Состояние</label>
                      <input class="input" type="text" v-model="stte" ref="stte_ref" name="stte" />
                      <p v-for="(error, index) in stte_errors" :key="index">
                          {{ error }}
                      </p>
                  </div>
              </div>

            <div class="inline-box">
<!--              <div class="field">-->
<!--              <div class="control is-expanded">-->
<!--                <div class="select is-fullwidth">-->
<!--                  <select @select="template()">-->
<!--                    <option v-for="template in templates">{{ template.name }}</option>-->
<!--&lt;!&ndash;                    <option>Рельc</option>&ndash;&gt;-->
<!--&lt;!&ndash;                    <option>Колесная пара</option>&ndash;&gt;-->
<!--                  </select>-->
<!--                </div>-->
<!--              </div>-->
<!--              </div>-->
            <div v-for="(pair, index) in payload" :key="index" class="field is-grouped">
              <p class="control is-expanded">
                <input v-model="pair.key" class="input" type="text" placeholder="Ключ">
              </p>
              <p class="control is-expanded">
                <input v-model="pair.value" class="input" type="text" placeholder="Значение">
              </p>
              <p class="control">
                <a v-show="index == payload.length-1" class="button is-light" @click="add">
                  <span class="icon is-small"><i class="fas fa-plus"></i></span>
                </a>
                <a v-show="index < payload.length-1" class="button is-light" @click="remove(index)">
                  <span class="icon is-small"><i class="fas fa-minus"></i></span>
                </a>
              </p>
            </div>
            </div>
            <hr>
            <div class="control">
              <button @click="addObject" class="button is-link is-pulled-right">Добавить</button>
            </div>
          </form>
        </section>
      </div>

        <!-- <div class="inline-box">
          <b-field grouped>
            <b-field label="Изготовитель" :message="$v.form.manufacturer.$error && 'Поле является обязательным'" :type="$v.form.manufacturer.$error && 'is-danger'" expanded>
              <b-autocomplete
                      v-model="form.manufacturer"
                      :data="filteredManufacturers"
                      :custom-formatter="company => company ? company.name : ''"
                      placeholder=""
                      @select="option => selectedManufacturer = option"
                      @blur="$v.form.manufacturer.$touch()"
              >
                <template slot-scope="props">
                  <div class="media">
                    <div class="media-left">
                      <span v-html="props.option.id"></span>
                    </div>
                    <div class="media-content">
                      <span v-html="props.option.name"></span>
                    </div>
                  </div>
                </template>
              </b-autocomplete>
            </b-field>
            <b-field label="Серийный номер оси" expanded>
            <b-input placeholder="" type="number" min="0" max="999999"></b-input>
            </b-field>
            <b-field label="Год изготовления">
              <b-select placeholder="Выберите..." expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
              </b-select>
            </b-field>
          </b-field>
          <b-field>
          <p>Колесной паре будет присвоен идентификатор <b>2242-665678-20</b></p>
          </b-field>
        </div>

          <div class="inline-box">
          <b-field grouped>
            <b-field label="Собственник" expanded>
              <b-input placeholder=""></b-input>
            </b-field>
            <b-field label="Дата последнего ПО">
              <b-datepicker placeholder="Выберите дату..." icon="calendar-today" trap-focus expanded></b-datepicker>
            </b-field>
            <b-field label="Место последнего ПО" expanded>
              <b-input placeholder=""></b-input>
            </b-field>
          </b-field>

          <b-field grouped>
            <b-field label="Расположение" expanded>
              <b-input placeholder=""></b-input>
            </b-field>
            <b-field label="Признак" expanded>
              <b-select placeholder="Выберите..." expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
              </b-select>
            </b-field>
            <b-field label="Состояние" expanded>
              <b-select placeholder="Выберите..." expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
              </b-select>
            </b-field>
            <b-field label="Последняя операция" expanded>
              <b-select placeholder="Выберите..." expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
              </b-select>
            </b-field>
          </b-field>
          </div>

          <div class="columns">
            <div class="column is-3">
              <div class="inline-box">
                <b-field label="Тип КП" expanded>
                  <b-select placeholder="Выберите..." expanded>
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                  </b-select>
                </b-field>
                <b-field label="Диапазон толщины обода" expanded>
                  <b-select placeholder="Выберите..." expanded>
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="column">
              <div class="inline-box">
                <b-field grouped>
                  <b-field label="Торцевое крепление" expanded>
                    <b-select placeholder="Выберите..." expanded>
                      <option value="flint">Flint</option>
                      <option value="silver">Silver</option>
                    </b-select>
                  </b-field>
                  <b-field label="СОНК/НОНК" expanded>
                    <b-select placeholder="Выберите..." expanded>
                      <option value="flint">Flint</option>
                      <option value="silver">Silver</option>
                    </b-select>
                  </b-field>
                </b-field>
                <b-field grouped>
                  <b-field label="Диаметр по кругу катания колеса" expanded>
                    <b-select placeholder="Выберите..." expanded>
                      <option value="flint">Flint</option>
                      <option value="silver">Silver</option>
                    </b-select>
                  </b-field>
                  <b-field label="Тип подшипников буксы" expanded>
                    <b-select placeholder="Выберите..." expanded>
                      <option value="flint">Flint</option>
                      <option value="silver">Silver</option>
                    </b-select>
                  </b-field>
                </b-field>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="showAddWheelsetModal = false">Close</button>
          <button class="button is-primary">Login</button>
        </footer>
      </div> -->

      <!--<div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Добавить колесную пару</p>
          <a aria-label="close" @click="showAddWheelset = false"> <span class="icon is-small">
                            <i class="fas fa-times"></i>
                        </span></a>
        </header>
        <section class="modal-card-body">
          <p>Alternatively you can install the <a href="//gram-wallet.org/plugin" target="_blank">Gram Wallet plugin</a> for better playing experience.</p>-->
          <!--<template v-if="invalidAddress">
            <b-field label="Your wallet address" type="is-danger" message="This address is invalid"
                     expanded>
              <b-input v-model="tonAddress" placeholder="">
              </b-input>
            </b-field>
          </template>
          <template v-else>
            <b-field label="Your wallet address" message="Copy the 48-letter wallet address here" expanded>
              <b-input v-model="tonAddress" placeholder=""></b-input>
            </b-field>
          </template>

          <a class="button is-link" @click="loginByAddress" target="_blank">Login</a>-->


          <!--<div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Изготовитель">
            </p>
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Серийный номер оси">
            </p>
            <div class="control">
              <b-select placeholder="Год изготовления" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
              </b-select>
            </div>
          </div>-->
        <!--</section>
        <footer class="modal-card-foot">
        </footer>
      </div>-->
    </b-modal>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api"
import InputSerial from "@/components/InputSerial"

import useValidator from "@/composables/useValidator";
import { required, numeric, maxLength } from "@/validators";
//import useEvent from "@/composables/useEvent";

import eventHub from '@/event.js'
// import { required, maxLength, numeric } from 'vuelidate/lib/validators'

//import utils from '../../../utils.js'
//import { paths, httpStatusCodes } from 'config'
//import { axiosMixin, convertMixin } from '../../../mixins.js'
//import { StatesByTag, OperationsByState } from '../../../keydict.js'
//import { uiMixin, yearsMixin, orgsMixin, usersMixin } from '../../../configmixins.js'

//const filterCompanies = {
//  filter(option) {
//    for (var key in option) {
//      if (option[key].toString()
//                     .toLowerCase()
//                     .indexOf(this) >= 0) {
//        return true
//      }
//    }
//    return false
//  }
//},
//  processCompany = company => {
//    if (typeof company.id !== 'undefined') {
//      return utils.padCompanyCodeWithZeroes(company.id.toString())
//    }
//    return ''
//  },
//  year = yearsMixin.data().year

export default {
  name: 'modalAdd',
  setup () {
    const showModalAdd = ref(false);
    onMounted(() => {
        eventHub.$on('show_modal_add', () => {
          showModalAdd.value = true;
        })
    });

    let form_validation = {
      'manufacturer': [ required, numeric, maxLength(4) ],
      'serial': [ required, numeric, maxLength(6) ],
      'year_build': [ required, numeric, maxLength(4) ],
      'owner': [ required ],
      'locat': [ required ],
      'stte': [ required ]
    }

    for (let field in form_validation) {
      window[field] = ref('')
      const { errors } = useValidator(window[field], form_validation[field])
      window[field + '_errors'] = reactive(errors)
    }

    function onSubmit() {
      for (let field in form_validation) {
        if (window[field + '_errors'].value.length > 0) {
          alert("form invalid");
        } else {
          alert('ok');
        }
      }
    }

    let payload = ref([{ key: '', value: '' }]);

    function add() {
      payload.value.push({ key: ``, value: '' });
    }

    function remove(index) {
      payload.value.splice(index, 1)
    }

    // const railTemplate = [{
    //     name: 'type',
    //     value: [],
    //     dictionary: null
    //   },
    //   {
    //     name: 'quality_category',
    //     value: [],
    //     dictionary: null
    //   }];

    // quality_category: []

    // let templates = ref([{ name: 'Рельс', template: railTemplate }, { name: 'Без шаблона', template: [{}] }])

    function addObject() {
        const id = `${manufacturer.value}-${serial.value}-${year_build.value}`;

        let payload = {
            owner: owner.value,
            location: locat.value,
            state: stte.value
        };

        // for (let pair in payload.value) {
        //     tmp[pair.key] = pair.value;
        // }

        let uri = `fab://send?id=${id}&payload=${JSON.stringify(payload)}`;

        console.log("URI IS: ", uri);
        //const encoded = encodeURI(uri);
        window.open(uri);
    }

    return {
      showModalAdd,
      onSubmit,
      add,
      remove,
      //templates,
      addObject,
      manufacturer,
      manufacturer_errors,
      serial,
      serial_errors,
      year_build,
      year_build_errors,
      owner,
      owner_errors,
      locat,
      locat_errors,
      stte,
      stte_errors,
      payload
    }
  }
}
</script>
