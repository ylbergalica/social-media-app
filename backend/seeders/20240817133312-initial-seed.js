'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // seed users
    await queryInterface.bulkInsert('Users', [
      {
        username: 'john',
        password: 'password', // Note: In a real application, you should hash the password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'sarah',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // seed posts
    await queryInterface.bulkInsert('Posts', [
      {
        text: 'We live in a society...',
        userId: 1,
        likes: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Morning coffee is way better than morning tea and everyone should agree!!',
        userId: 2,
        likes: 1,
        createdAt: new Date('2024-01-10T00:00:00Z'),
        updatedAt: new Date('2024-01-10T00:00:00Z'),
      },
    ], {});

    // seed likes
    await queryInterface.bulkInsert('Likes', [
      {
        userId: 1,
        postId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // seed comments
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 2,
        postId: 1,
        text: 'That is very true!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 1,
        text: 'What? I do not agree with this at all..',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 2,
        text: 'Agree to disagree then.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
