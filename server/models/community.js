import mongoose from 'mongoose'

export const modelTypes = ['online', 'presential', 'both']
export const statusTypes = ['awaitingPublication', 'published', 'archived']

export const invitationStatus = {
  awaiting: 'AWAITING',
  accepted: 'ACCEPTED',
  declined: 'DECLINED'
}

function validateCountry () {
  return !(this.model === 'online')
}

function validateLocation () {
  const isOnline = this.model === 'online'
  const isBrazilian =
    !!(this.location && this.location.country === 'Brasil')
  return !isOnline && isBrazilian
}

const creator = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rocketChat: {
    type: String
  }
}

const location = {
  country: {
    type: String,
    required: validateCountry
  },
  state: {
    type: String,
    required: validateLocation
  },
  city: {
    type: String,
    required: validateLocation
  },
  latitude: {
    type: Number,
    required: validateLocation
  },
  longitude: {
    type: Number,
    required: validateLocation
  }
}
const globalProgram = {
  isParticipant: {
    type: Boolean,
    required: true
  },
  name: {
    type: String
  }
}

const manager = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: { type: String, required: true },
  invitation: {
    status: { type: String, required: true },
    in: { type: Date, required: true }
  }
}

const links = {
  type: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    logo: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    links: [links],
    members: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      enum: modelTypes,
      required: true
    },
    location,
    globalProgram,
    owner: {
      type: String,
      required: true
    },
    managers: [manager],
    creator,
    status: {
      type: String,
      enum: statusTypes,
      required: true,
      default: 'awaitingPublication'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Community', communitySchema)
