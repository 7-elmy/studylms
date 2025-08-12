// import React from 'react'

// export default function Statistics() {
//   return (
//     <div className='flex flex-col justify-center items-center gap-5 py-3'>
//       {/* <div className='flex items-center w-[80%] mx-auto justify-between px-4 py-2'>
//         <h2 className='text-lg font-semibold'>Statistics</h2>
//         <button className='text-custom-yellow hover:underline'>View All</button>
//        </div> */}
//     <div className='w-[80%] h-[200px] border-s-2 border-custom-yellow bg-white  flex justify-around items-center'>

//         <div className='space-y-2 '>
//             <h4 className='text-5xl'>1500</h4>
//             <p className='w-[70px] h-1 bg-custom-yellow'></p>
//             <p className='text-gray-500'>COUNTRIES REACHED</p>
//         </div>
//         <div className='space-y-2 '>
//             <h4 className='text-5xl'>25000</h4>
//             <p className='w-[70px] h-1 bg-custom-yellow'></p>
//             <p className='text-gray-500'>PASSED GRADUATES</p>
//         </div>
//         <div className='space-y-2 '>
//             <h4 className='text-5xl'>750</h4>
//             <p className='w-[70px] h-1 bg-custom-yellow'></p>
//             <p className='text-gray-500'>QUALIFIED ST</p>
//         </div>
//         <div className='space-y-2 '>
//             <h4 className='text-5xl'>1200</h4>
//             <p className='w-[100px] h-1 bg-custom-yellow'></p>
//             <p className='text-gray-500'>CCOURSES PUBLISHED</p>
//         </div>
//     </div>

//     </div>
//   )
// }



import React from 'react'

export default function Statistics() {
  const stats = [
    { value: '1500', label: 'COUNTRIES REACHED', barWidth: 'w-[70px]' },
    { value: '25000', label: 'PASSED GRADUATES', barWidth: 'w-[70px]' },
    { value: '750', label: 'QUALIFIED ST', barWidth: 'w-[70px]' },
    { value: '1200', label: 'COURSES PUBLISHED', barWidth: 'w-[100px]' }
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5 py-3 px-4">
      <div
        className="
          w-full max-w-6xl
          border-s-2 border-custom-yellow bg-white
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-y-6 sm:gap-y-8 lg:gap-y-0
          justify-items-center
          py-6 px-4
        "
      >
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2 text-center">
            <h4 className="text-4xl md:text-5xl font-bold">{stat.value}</h4>
            <p className={`${stat.barWidth} h-1 bg-custom-yellow mx-auto`}></p>
            <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
