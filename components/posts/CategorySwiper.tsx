import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Category from "@/components/posts/category";
import { useState } from "react";
import Link from "next/link";
interface swiperProps {
  content: {
    id: number,
    image: string,
    text: string,
  }[];
}
const CategorySwiper = (props) => {
  const [swiper, setSwiper] = useState<any>(null);
  return (
    <div className="w-11/12 flex relative justify-center">
  <div className="swiper-button-prev absolute left-3" onClick = {()=>{swiper?.slidePrev()}}></div>
  <Swiper
    modules={[Navigation]}
    spaceBetween={50}
    onBeforeInit={swipper => setSwiper(swipper)}
    slidesPerView={3}
    className="w-4/5 h-28"
    loop= {true}
  >
    {
      props.content.map((a,i) => {
        return (<SwiperSlide key={a.id} className="h-32"><Link href={`/posts/${a.text}`}><Category text={a.text} image={a.image} /></Link></SwiperSlide>);
      })
    }
  </Swiper>
    <div className="swiper-button-next absolute" onClick = {() => {swiper?.slideNext()}}></div>
    
  </div>
  )
}
export default CategorySwiper;