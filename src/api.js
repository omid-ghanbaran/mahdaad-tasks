export const fetchUserData = async (userId) => {
  const delay = Math.random() * 1000 + 500
  await new Promise((resolve) => setTimeout(resolve, delay))

  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    joinDate: new Date().toISOString().split('T')[0],
    stats: {
      posts: Math.floor(Math.random() * 100),
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 500),
    },
  }
}
