export default {

  methods: {
    /**
     * Check if the label is function or string
     * @param {string|function}label
     */
    getLabelValue (label) {
      return label && typeof label === 'function' ? label() : label ;
    }
  }
}
