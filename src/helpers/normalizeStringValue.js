module.exports = (value, valueType = 'auto') => {
  const normalize = {
    value,

    number() {
      const numberValue = Number(this.value);

      if (!Number.isNaN(numberValue) && Number.isFinite(numberValue)) {
        this.value = numberValue;
      }

      return this;
    },

    boolean() {
      if (
        typeof this.value === 'string' &&
        (this.value.toLowerCase() === 'true' || this.value.toLowerCase() === 'false')
      ) {
        this.value = this.value.toLowerCase() === 'true';
      }

      return this;
    },

    string() {
      this.value = String(this.value);
      return this;
    },

    null() {
      if (typeof this.value === 'string' && this.value.toLowerCase() === 'null') {
        this.value = null;
      }

      return this;
    },

    undefined() {
      if (typeof this.value === 'string' && this.value.toLowerCase() === 'undefined') {
        this.value = undefined;
      }

      return this;
    },

    auto() {
      this.value = this.string().number().boolean().null().undefined().value;

      return this;
    }
  };

  return normalize[valueType]().value;
};
