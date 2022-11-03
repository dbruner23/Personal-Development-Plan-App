const myTreeData = [
    {
      name: "Start",
      children: [
        {
          name: "path 1",
          children: [
            {
              name: "course A",
              children: [
                {
                  name: "certificate A",
                  children: [
                    {
                      name: "certificate B",
                      children: [
                        {
                          name: "course C",
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
          ],
        },
        {
          name: "path 2",
          children: [
            {
              name: "Course D1 - This course will take you to your goal",
            },
            {
              name: "Course D2 - This course will also take you to your goal",
            },
          ],
        },
        {
          name: "path 3",
          children: [
            {
              name: "course 1",
              children: [
                {
                  name: "certificate 1A",
                  children: [
                    {
                      name: "certificate 1B",
                      children: [
                        {
                          name: "You've reached your goal",
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "course 2",
                  children: [
                    {
                      name: "You've reached your goal",
                    },
                  ],
                },
              ],
            },
            {
              name: "certificate 3",
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