import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { Pagination } from 'element-ui';
import elTableInfiniteScroll from 'element-ui';

Vue.use(elTableInfiniteScroll);
Vue.use(Pagination);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;