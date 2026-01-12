import React from 'react';

const Navber = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'> &lt;</span>
          
          Pass
          <span className='text-green-500'>OP/&gt;</span>
          
          </div>
       <ul>
         <li className='flex gap-4'>
            <a className='hover:font-bold' target='_blank' href="https://www.linkedin.com/in/sourish-harh-86298124b/">Contact</a>
         </li>
       </ul>
        
       </div>
    </nav>
  );
}

export default Navber;
