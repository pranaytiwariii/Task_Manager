'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import TaskDashboard from '../components/TaskDashboard'

export default function Home() {
  return (
    <Provider store={store}>
      <TaskDashboard />
    </Provider>
  )
}

