import { ref, watch } from "@vue/composition-api";
import eventHub from '@/event.js'

export default function (startVal, validators) {
  console.log("CALL UseValidator")
  const input = ref(startVal);
  let errors = ref([]);
  watch(input.value, value => {
    console.log("WATCH UseValidator")
    errors.value = validators.map(validator => validator(value)).filter(Boolean);

  });
  return {
    input,
    errors
  };
}