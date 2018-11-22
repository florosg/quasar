import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../utils/colors.js'
import clone from "../utils/clone";

export default {
  props: {
    defaultValue: {
      type: [String, Object],
      default: null
    },
    formatModel: {
      type: String,
      default: 'auto',
      validator: v => ['auto', 'hex', 'rgb', 'hexa', 'rgba'].includes(v)
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    forceAlpha () {
      return this.formatModel === 'auto'
        ? null
        : this.formatModel.indexOf('a') > -1
    }
  },
  methods: {
    __parseModel(v) {
      if (v === null || v === void 0) {
        return {h: 0, s: 0, v: 0, r: 0, g: 0, b: 0, hex: void 0, a: 100}
      }

      let model = typeof v === 'string' ? hexToRgb(v.trim()) : clone(v)
      if (this.forceAlpha === (model.a === void 0)) {
        model.a = this.forceAlpha ? 100 : void 0
      }
      model.hex = rgbToHex(model)
      return Object.assign({a: 100}, model, rgbToHsv(model))
    },

    __rgbToHex (value) {
      return typeof value === 'string' ? value : rgbToHex(value);;
    }
  }
}
