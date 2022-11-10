const myTreeData = [
    {
      name: "Start",
      children: [
        {
          name: "Study with Mission Ready",
          attributes: {
            time: '6-8 months',
          },
          children: [
                {
                  name: "Full Stack Developer Certificate (Level 4)",
                  attributes: {
                    time: '12 weeks',
                  },
                  children: [
                    {
                      name: "Cloud and Devops Developer Certificate (Level 5)",
                      attributes: {
                        time: '9 weeks',
                      },
                      children: [
                        {
                          name: "MENTORED INDUSTRY LEARNING EXPERIENCE Certificate (Level 6)",
                          attributes: {
                            time: '10 weeks',
                          },
                          children: [
                            {
                              name: "You've reached your goal",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
        },
        {
          name: "Study at University",
          attributes: {
            time: '3 years',
          },
          children: [
            {
              name: "Bachelor of Software Engineering",
              attributes: {
                university: 'AUT',
              },
            },
            {
              name: "Bachelor of Engineering",
              attributes: {
                university: 'Waikato University',
              },
            },
          ],
        },
        {
          name: "ME - Software Engineering",
          attributes: {
            time: '1 year ',
          },
          children: [
            {
              name: "Master of Software Engineering",
              children: [
                {
                  name: "University of Waikato",
                      children: [
                        {
                          name: "You've reached your goal",
                        },
                      ],
                    },
                {
                  name: "Victoria University Wellington",
                  attributes: {
                    degree: 'Master of Software Development',
                  },
                  children: [
                    {
                      name: "You've reached your goal",
                    },
                  ],
                },
              ],
            },
            {
              name: "Postgraduate study in Software Engineering",
              attributes: {
                university: 'University of Auckland',
              },
                  children: [
                    {
                      name: "You've reached your goal",
                    },
                  ],
            },
          ],
        },
      ],
    },
];

export default myTreeData