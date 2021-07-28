/**
 * 公共相关api
 */

const API_tools = vm => {
  return {
    /**
     * 根据城市ID获取下级城市
    */
    getCityById: (params = {}) => vm.$u.post('/System/getAreas', params),
  }
}

export default API_tools
