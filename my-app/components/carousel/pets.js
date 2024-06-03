const pets = [
    {
      pet: 'cats',
      pets: [
        {
          id: '1',
          name: 'Lily',
          image: require('../../assets/animals/cat.jpg'),
          type: 'Chausie',
          age: '5 years old',
        },
        {
          id: '2',
          name: 'Lucy',
          image: require('../../assets/animals/cat2.jpg'),
          type: 'Bobtail',
          age: '2 years old',
        },
        {
          id: '3',
          name: 'Nala',
          image: require('../../assets/animals/cat3.jpg'),
          type: 'Ragamuffin',
          age: '2 years old',
        },
      ],
    },
    {
      pet: 'dogs',
      pets: [
        {
          id: '1',
          name: 'Bally',
          image: require('../../assets/animals/dog1.jpg'),
          type: 'German Shepherd',
          age: '2 years old',
        },
        {
          id: '2',
          name: 'Max',
          image: require('../../assets/animals/dog2.jpg'),
          type: 'Foxhound',
          age: '2 years old',
        },
      ],
    },
    {
      pet: 'birds',
      pets: [
        {
          id: '1',
          name: 'Coco',
          image: require('../../assets/animals/bird1.jpg'),
          type: 'Parrot',
          age: '2 years old',
        },
        {
          id: '2',
          name: 'Alfie',
          image: require('../../assets/animals/bird2.jpg'),
          type: 'Parrot',
          age: '4 years old',
        },
      ],
    },
    {
      pet: 'bunnies',
      pets: [
        {
          id: '1',
          name: 'Boots',
          image: require('../../assets/animals/bunny1.jpg'),
          type: 'Angora',
          age: '1 years old',
        },
        {
          id: '2',
          name: 'Pookie',
          image: require('../../assets/animals/bunny2.jpg'),
          type: 'Angora',
          age: '1 years old',
        },
      ],
    },
  ];
  
  export default pets;
  