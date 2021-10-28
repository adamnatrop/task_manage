import axios from "axios";
axios.defaults.withCredentials = true;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // registers new user and saves to database
    saveUser: function(userData) {
        return axios.post("/api/user/register", userData);
    },
    // checks current session to see if user is logged in or not
    currentSession: function(session) {
        return axios.get('/api/user/current-session', session)
    },
    //login user
    loginUser: function(userData) {
        return axios.post('/api/user/login', userData)
    },
    // logout user
    logoutUser: function(userData) {
        return axios.post('/api/user/logout', userData)
    },
    // get initial state data
    getColumnsData: function(){
        return axios.get("/api/user/columnsdata");
    },

    addNewTask: function(taskData){
        return axios.post("/api/task/", taskData);
    },

    addTaskToColumn: function(taskId){
        return axios.post("/api/task/taskid", taskId)
    },

    deleteTask: function(id){
        return axios.delete("/api/task/" + id);
    },

    updateState: function(state){
        return axios.post("/api/task/columnstate", state)
    }
    // // get product by id
    // getproduct: function(id) {
    //     return axios.get("/api/product/" + id);
    // },
    // // Deletes the product with the given id
    // deleteProduct: function(id) {
    //     return axios.delete("/api/product/" + id);
    // },
    // // Saves a product to the database
    // saveProduct: function(productData) {
    //     return axios.post("/api/product", productData);
    // },

    // addComment: function(commentData) {
    //     return axios.post("/api/product/comment", commentData);
    // },

    // getProductComments: function(data) {
    //     return axios.get("/api/product/comment", data);
    // }

}
