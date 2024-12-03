import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import { TaskDashboard } from './components/TaskDashboard';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <TaskDashboard />
      </ConfigProvider>
    </Provider>
  );
}

export default App;