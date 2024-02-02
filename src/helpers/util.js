/**
 * @function normalizeStringValue - Normalizes string value to specified js type. If no type specified, follows 'auto' strategy.
 * @param {string} value - String value to be normalized.
 * @param {'string'|'number'|'boolean'|'null'|'undefined'|'auto'} [valueType = 'auto'] - Value type (Defaults to 'auto').
 * @returns {string|number|boolean|null|undefined} The normalized value. !IMPORTANT! null value will be returned in case of normalization error.
 */
const normalizeStringValue = (value, valueType = 'auto') => {
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

  try {
    return normalize[valueType]().value;
  } catch (err) {
    // 'Value normalization failed:', err
    throw err;
  }
};

module.exports = {
  normalizeStringValue
};
