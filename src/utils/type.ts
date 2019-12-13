export default (data: any): string => {
  return Object.prototype.toString.call(data).toLowerCase().slice(8, -1)
}
