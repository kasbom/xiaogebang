/**
 * 技师相关api
 */

const API_skill = vm => {
  return {
    /**
     * 技师端缴纳保证金
    */
    payBondMoney: (params = {}) => vm.$u.post('skill/payBondMoney', params),
  }
}

export default API_skill
