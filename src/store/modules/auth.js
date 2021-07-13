//store/modules/auth.js

const state = {
    user: null,
    token: null,
    log_in_time: null,
    remember: false,
};

const getters = {
    isAuthenticated: state => !!state.user,    
    user: state => state.user,
    accessToken: state => state.token.access_token,
    refreshToken: state => state.token.refresh_token,
    loggedInAt: state => state.log_in_time, 
    tokenExpiresIn: state => state.token.expires_in,
    isRemembered: state => state.remember
};

const actions = {
    async SetUser({ commit }, user){
        commit('setUser', user)
    },
    async SetToken({ commit }, token){
        commit('setToken', token)
    },
    async SetLogInTime({ commit }){
        commit('setLogInTime')
    },
    async SetRemember({ commit }){
        commit('setRemember')
    },
    async LogOut({ commit }){
        commit('logOut')
    }
};

const mutations = {
    setUser(state, user){
        state.user = user
    },
    setToken(state, token){
        state.token = token
        state.token.expires_in = state.token.expires_in * 1000
    },
    setRemember(state){
        state.remember = true
    },
    setLogInTime(state){
        state.log_in_time = Date.now()
    },
    logOut(state){
        state.user = null
        state.token = null
        state.log_in_time = null
        state.remember = false
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
