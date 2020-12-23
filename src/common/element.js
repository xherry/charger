import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import { Message, MessageBox, Pagination, DatePicker, Loading } from 'element-ui';
import elTableInfiniteScroll from 'element-ui';

Vue.use(elTableInfiniteScroll);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;