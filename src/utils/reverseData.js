/* reverse transform 3d data
 * used for canvas part in viewport
 * @parm Object data, the data is generated from initStepData,
 * so every needed property exists surely
 * @return Object reversed data
 **/
const reverseData = data => ({
  translate: {
    x: -data.translate.x,
    y: -data.translate.y,
    z: -data.translate.z,
  },
  rotate: {
    x: -data.rotate.x,
    y: -data.rotate.y,
    z: -data.rotate.z,
  },
  scale: data.scale ? (1 / data.scale) : 1,
})

export default reverseData
