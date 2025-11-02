import DetailProduct from '@/components/detail-product/DetailProduct'
import NavbarDetail from '@/components/navbar-detail/NavbarDetail'
import React from 'react'

const page = () => {
  return (
    <div className='bg-primary min-h-screen '>
    <NavbarDetail />
    <DetailProduct />
    </div>
  )
}

export default page