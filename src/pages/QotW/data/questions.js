let user1 = {username: 'John Doe', imgUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'};
let user2 = {username: 'Jane Smith', imgUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'};
let user3 = {username: 'Paul Simon', imgUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'};
let user4 = {username: 'Mike Simms', imgUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'};

export const Questions = [
  {
    date: '09/15/2017',
    question: 'If you could only eat tacos for the rest of your life, would you choose: ',
    answer1: 'Soft Shell',
    answer2: 'Hard Shell',
    answer1Votes: '145',
    answer2Votes: '263',
    comments: [
      {
        comment: 'Soft shell, when you get older you cant eat tough stuff',
        user: user1,
        replies: [
          {
            reply: 'Getting taco in your teeth!, No Way!',
            user: user2
          },
          {
            reply: 'I like the Dorito crunchy tacos, the best',
            user: user3
          }
        ]
      },
      {
        comment: 'Im hard shell all the way, too much fat in soft tortillas',
        user: user2,
        replies: [
          {
            reply: 'Agreed!',
            user: user4
          },
          {
            reply: 'Whats wrong with you ppl?',
            user: user1
          }
        ]
      }
    ]
  },
  {
    date: '09/16/2017',
    question: 'If you could watch only one for the rest of your life, would you choose: ',
    answer1: 'Sunrise',
    answer2: 'Sunset',
    answer1Votes: '654',
    answer2Votes: '729',
    answer1url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOfAiO1IncW5_hWHvA7qo93HU4bofMsmabhJDX7RG97bzhSTfHg',
    answer2url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCch4RTTw01AGxISFGawE0SRAVqhkrbDe5tGLdnCJzso0bbklCg',
    comments: [
      {
        comment: 'Nothing beats a good sunset',
        user: user3,
        replies: [
          {
            reply: 'got that right',
            user: user4
          },
          {
            reply: 'not sure about that, sunrises are the best',
            user: user2
          }
        ]
      },
      {
        comment: 'not too bad',
        user: user2,
        replies: [
          {
            reply: 'sunrises for sure',
            user: user4
          },
          {
            reply: 'hate these threads',
            user: user1
          }
        ]
      }
    ]
  }
];
