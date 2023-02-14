// import styles from './Home.module.css'

import GaugeDisplay from '../../components/GaugeDisplay';
import GaugeNew from '../../components/GaugeNew';
import GaugeRes from '../../components/GaugeRes';

export default function Home() {

  return (
    <div>
      <div className="hidden md:block">
      <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="ml-3 text-3xl font-bold text-gray-900">Monitor Battery Voltage and Time Remaining</h1>
        </div>
      </header>
       </div>
        {/* <GaugeDisplay></GaugeDisplay> */}
        {/* <GaugeNew></GaugeNew> */}
        <GaugeRes></GaugeRes>    
    </div>
  )
}