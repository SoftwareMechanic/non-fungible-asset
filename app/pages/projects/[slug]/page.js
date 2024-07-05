"use client"


import React from 'react';

const ProjectPage = ({ params }) => {
  //const router = useRouter();

  // const navigateHome = () => {
  //   // Programmatically navigate to the home page
  //   router.push('/');
  // };

  return (
    <main>
      <h1>This is a dynamic page with id: {params.slug}</h1>
      <button >Go Home</button>
    </main>
  );
};

export default ProjectPage;