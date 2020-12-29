import Vue from "vue";
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import "element-ui/lib/theme-chalk/index.css";

//设置语言
locale.use(lang)

import { Message, MessageBox, Pagination, DatePicker, Loading } from 'element-ui';
import elTableInfiniteScroll from 'element-ui';

Vue.use(elTableInfiniteScroll);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;

// console.log(ELEMENT)
// ELEMENT.locale(ELEMENT.lang.en)
// ELEMENT.locale(lang)