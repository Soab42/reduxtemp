import React from "react";
import MainVideo from "../../components/student/MainVideo";
import SidebarVideo from "../../components/student/SidebarVideo";
import { useGetVideosQuery } from "../../features/videos/videosApi";

export default function CoursePlayer() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content;
  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = <div>{"There is an erorr"}</div>;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <MainVideo />
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
              {/* single video component */}
              {videos &&
                videos?.map((video) => (
                  <SidebarVideo video={video} key={video.id} />
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  } else if (videos.length === 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0 flex justify-center item-center ">
          <div className=" text-[4rem]">Course is starting soon!</div>
        </div>
      </section>
    );
  }
  return content;
}
