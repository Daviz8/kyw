import React from 'react';

export type Post = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  duration: string;
  quote:string,
  first:string,
  second:string,
  third:string,
  summary:string
};

export interface BlogPostCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  duration: string;
  
}

export const post = [
  {
    id: 1,
    title: "ANXIETY",
    imageUrl: "/images/brain-icon.webp",
    description: "The Body Keeps the Score and Sometimes Overreacts",
    date: "April 7",
    duration: "6 mins",
    quote: "Anxiety is not a sign of weakness; it is a sign that your survival instincts are working overtime.",
    first: "Anxiety isn't just 'in your head.' It is a full-body experience that begins in the nervous system. When the brain perceives a threat even a non-physical one like a deadline or a social interaction it triggers a physiological cascade of cortisol and adrenaline.",
    second: "For children and adolescents, this often manifests as physical symptoms: stomach aches, headaches, or a racing heart. Understanding that these sensations are the body's way of trying to protect us is the first step in learning how to self-regulate and find safety in the present moment.",
    third: "By practicing 'grounding' techniques such as the 5-4-3-2-1 method we can communicate back to our nervous system that the immediate danger has passed, allowing the brain to shift from survival mode back into a state of growth and connection.",
    summary: "Exploring the physiological roots of anxiety and how to help the body return to a state of calm."
  },
  {
    id: 2,
    title: "PRESSURE",
    imageUrl: "/images/brain-icon.webp",
    description: "Rest is Not a Reward You Have to Earn",
    date: "April 15",
    duration: "5 mins",
    quote: "Rest is a biological necessity, not a luxury reserved for those who have finished their 'to-do' list.",
    first: "In our high-achievement culture, we often teach children that downtime is something to be granted only after hard work. However, the brain requires 'default mode' processing time to consolidate memories, process emotions, and spark creativity.",
    second: "When we constantly operate under pressure, the prefrontal cortex the part of the brain responsible for decision-making and emotional controlnbecomes fatigued. This leads to burnout, irritability, and a decreased ability to handle everyday stressors.",
    third: "True rest involves more than just sleep. It includes sensory rest, social rest, and emotional rest. Encouraging 'unstructured play' for children and 'guilt-free stillness' for adults is vital for long-term mental resilience and cognitive health.",
    summary: "Revisiting our relationship with productivity and learning why rest is fundamental to mental health."
  },
  {
    id: 3,
    title: "CONNECTION",
    imageUrl: "/images/brain-icon.webp",
    description: "The Power of Co-Regulation in Early Childhood",
    date: "April 27",
    duration: "7 mins",
    quote: "A child’s dysregulation is not a request for discipline; it is a cry for connection.",
    first: "Children do not enter the world with the ability to manage big emotions on their own. They learn to regulate their nervous systems through 'co-regulation' the process of borrowing the calm of a trusted adult during a moment of distress.",
    second: "When a child is in the middle of a meltdown, their logical brain is essentially offline. At this moment, words and lectures are often ineffective. What they need is a calm presence, a steady voice, and a sense of physical safety to help lower their emotional 'temperature.'",
    third: "Building this foundation of secure attachment doesn't mean being a perfect parent or counselor. It means being a consistent one. Through connection, we give children the tools they need to eventually navigate the world's challenges independently.",
    summary: "Understanding how safe relationships provide the blueprint for a child's lifelong emotional health."
  }
];


export const BlogPostCard: React.FC<BlogPostCardProps> = ({id, imageUrl , title , duration, date ,description }) => {


 const handleReadMore = () => {
  const foundPost = post.find(item => item.id === id);
  localStorage.setItem("ChoosenPost", JSON.stringify(foundPost));
  console.log(foundPost);
};

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-1000 hover:shadow-2xl motion-rotate-in-90 ">
      <img loading="eager"  className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <p className="text-sm text-gray-500">{date} • {duration}</p>
        <h2 className="font-bold text-xl mb-2 text-gray-900 mt-2">{title}</h2>
        <p className="text-gray-700 text-base mb-4">{description}</p>


        {/* Read More Link */}
        <a
         onClick={handleReadMore}
         href='/message'
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#21B34D] transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

