module.exports = {
  o2a: function(data) {
    if(Array.isArray(data)) {
      return data;
    }else if(data == null) {
      return data;
    }else {
      return Object.keys(data).map(key => ({
        key,
        value: data[key]
      }));
    }
  }
}
