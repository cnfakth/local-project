'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';

const AGE_OPTIONS = [
  { label: '學齡前', value: 'preschool' },
  { label: '幼稚園', value: 'kindergarten' },
  { label: '小學低年級', value: 'lower-elementary' },
  { label: '小學中年級以上', value: 'upper-elementary' },
];

const PERSONALITY_OPTIONS = [
  { label: '活潑開朗', value: 'outgoing' },
  { label: '成熟聰慧', value: 'mature' },
  { label: '古靈精怪', value: 'quirky' },
  { label: '穩重沉靜', value: 'calm' },
];

const EXPERIENCE_OPTIONS = [
  { label: '學習兩年以上', value: 'over-2-years' },
  { label: '學習未滿兩年', value: 'under-2-years' },
  { label: '未接觸過', value: 'none' },
  { label: '不確定', value: 'unsure' },
];

export default function CourseRecommendation() {
  const [age, setAge] = useState<string | null>(null);
  const [personality, setPersonality] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  const handleSubmit = () => {
    if (age && personality && experience) {
      alert(
        `推薦結果:\n年齡: ${age}\n個性: ${personality}\n學習經驗: ${experience}`
      );
    }
  };

  const renderOptions = (
    title: string,
    options: { label: string; value: string }[],
    selected: string | null,
    setSelected: (v: string) => void
  ) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`flex items-center cursor-pointer rounded px-3 py-2 transition ${
              selected === opt.value ? 'bg-teal-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelected(opt.value)}
          >
            <div
              className={`w-4 h-4 rounded-full mr-3 ${
                selected === opt.value ? 'bg-teal-500' : 'bg-zinc-300'
              }`}
            ></div>
            <span className="text-lg">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar 加入 */}
      <Sidebar />
      
      <div className="flex-1 min-h-screen flex flex-col ml-64">
        <div className="pt-24 px-6 space-y-6">
          {renderOptions('1. 孩子的年齡', AGE_OPTIONS, age, setAge)}
          {renderOptions('2. 您會怎麼描述孩子的個性', PERSONALITY_OPTIONS, personality, setPersonality)}
          {renderOptions('3. 是否曾學習過打擊樂器', EXPERIENCE_OPTIONS, experience, setExperience)}

          <button
            onClick={handleSubmit}
            disabled={!age || !personality || !experience}
            className={`w-full max-w-xs py-2 px-4 rounded text-white text-lg ${
              age && personality && experience
                ? 'bg-teal-600 hover:bg-teal-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            查看推薦樂器
          </button>
        </div>
      </div>
    </div>
  );
}
