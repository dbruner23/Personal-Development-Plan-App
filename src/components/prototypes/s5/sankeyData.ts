const sankeyData = {
    nodes: [
      { name: "Project Coordinator" },
      { name: "Marketing Coordinator" },
      { name: "Marketing Specialist" },
      { name: "Advertising Manager" },
      { name: "Product Marketing Manager" },
      { name: "Public Relations Manager" },
      { name: "Brand Manager" },
      { name: "Director of Media" },
      { name: "Director of Marketing Analytics" },
      { name: "VP of Brand Development" },
      { name: "Chief Marketing Officer" },
    ],
    links: [
      { source: 0, target: 4, value: 36 },
      { source: 0, target: 2, value: 15 },
      { source: 0, target: 3, value: 25 },
      { source: 1, target: 2, value: 6 },
      { source: 1, target: 3, value: 24 },
      { source: 1, target: 4, value: 24 },
      { source: 1, target: 6, value: 45 },
      { source: 2, target: 5, value: 32 },
      { source: 2, target: 3, value: 6 },
      { source: 2, target: 4, value: 25 },
      { source: 2, target: 6, value: 35 },
      { source: 3, target: 5, value: 21 },
      { source: 3, target: 7, value: 43 },
      { source: 4, target: 8, value: 55 },
      { source: 4, target: 5, value: 6 },
      { source: 4, target: 10, value: 60 },
      { source: 5, target: 7, value: 25 },
      { source: 5, target: 8, value: 48 },
      { source: 5, target: 9, value: 21 },
      { source: 6, target: 9, value: 31 },
      { source: 6, target: 10, value: 35 },
      { source: 6, target: 7, value: 10 },
      { source: 6, target: 8, value: 12 },
    ]
  };

  export default sankeyData;