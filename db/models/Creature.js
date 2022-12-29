
import mongoose from "mongoose";

const Creature = new mongoose.Schema({
  name: String,
  url: String,
  stats: {},
  drops: [
    {
      category: String,
      items: [
        {
          name: String,
          url: String,
          dropTrials: { type: Number, default: 0 },
          dropSuccesses: { type: Number, default: 0 },
          avgDropRate: { type: Number, default: 0 }
        }
      ]
    }
  ]
})

export default mongoose.models.Creature || mongoose.model('Creature', Creature);
