

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-4 ">
      <div className="   flex gap-4 items-end">
        <h1 className="text-6xl space-x-1 border-[4px] border-black py-1 px-5 rounded-[22px] shadow-200  h-24 flex items-center justify-center font-semibold">Y
          </h1>
          <span className="text-red-500/80  text-4xl rotate-12   h-16 flex items-center justify-center font-normal
          border-[2px] border-black py-1 px-5 rounded-[22px] shadow-200 basis-3
          ">C</span>
      </div>
      <div className=" text-6xl  flex gap-1 ">
        <div className="font-extralight animate-pulse delay-100 text-black/60">.</div>
        <div className="font-light animate-pulse delay-200 text-black/80">.</div>
        <div className="font-medium animate-pulse delay-300">.</div>
      </div>
    </div>
  )
}

export default Loading