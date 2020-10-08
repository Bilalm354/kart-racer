import mongoose from 'mongoose'

export const Score = mongoose.model('Score', { name: String, time: String });