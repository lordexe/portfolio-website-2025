import React from 'react';

export const Apex2025Showcase = () => {
  return (
    <div className="space-y-20 pt-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img src="/public/apex_2025/design_system_1.png" alt="Design System View 1" className="w-full h-auto rounded-3xl" />
        <img src="/public/apex_2025/design_system_2.png" alt="Design System View 2" className="w-full h-auto rounded-3xl" />
      </div>
      <p className="text-2xl leading-relaxed text-[#f4f4f5]/90 max-w-4xl mx-auto text-center">
        The design system focused heavily on motion principles to guide the user's attention through complex data flows, resulting in a 30% reduction in task completion time.
      </p>
      <div className="w-full relative aspect-video">
          <video 
            src="/public/apex_2025/final_ui_walkthrough.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover rounded-3xl"
          />
      </div>
    </div>
  );
};