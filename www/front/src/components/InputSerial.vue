<template>
    <div>
    <input class="input" type="text" v-model="input" name="serial" />
    <!--<p v-for="(error, index) in errors" :key="index">
        {{ error }}
    </p>-->
    </div>
</template>
<script>
  import { watch, ref } from "@vue/composition-api";
  //import useValidator from "@/composables/useValidator";
  //import { required, numeric, maxLength } from "@/validators";
  import eventHub from '@/event.js'

  export default {
    name: "InputSerial",
    props: {
      value: String
    },
    setup (props, { emit }) {

      const input = ref(props.value);
      // watch(errors, value => {
      //   eventHub.$emit('on_errors', { "InputSerial": errors })
      // });

      return {
          input
      }
    }
  }
</script>