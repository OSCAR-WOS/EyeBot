/*
 * Copyright (C) 2017-2018 Oscar Wos // github.com/OSCAR-WOS | theoscar@protonmail.com
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see http://www.gnu.org/licenses/.
 */

// How to effecitvly mute and sustain auto-mated voice muting in discord with various situations accounted for, and abiding by the permissions configuration. Assuming you already have all the necessary requirements pre-built, this is not a example of a full bot, but rather a snipet of functionality for said procedures.
// Using discord.js^11.3.0 | Linted with ESLint

// I will be creating a class for Mutes and Mute resprectivly. This will allow you to add / remove features, but the basic concept is there. If this is too complicated for you, you are welcome to stick to standard variable names, and adding properties respective to what they're function is, for example: var mutes[], and pushing a json style object into that array. These classes are very basic, and only provide a sort of "framework" for you to add ontop of.

class Mutes {
  constructor() {
    // You may wish to use a Collection instead of a basic array for advanced manipulations
    this.array = []
  }

  addMute(mute) {
    this.array.push(mute)
  }

  getMute(index) {
    return this.array[index]
  }

  deleteMute(index) {
    try {
      this.array.splice(index, 1)

      return true
    } catch (e) {
      return e
    }
  }

  checkMutes() {
    // Grabbing the current time in millisecond form
    let timestamp = new Date().valueOf()

    // Looping throughout all the mutees in our array, and checking each one. You may use Promises in order to comply with queries if you wish to too.
    for (let mute of this.array) {
      if (timestamp > mute.unmuteTime) {
        tryUnmute(mute.target)
      }
    }
  }

  findMutes(target) {
    let filter = this.array.filter(m => m.target === target)
    return filter ? filter : false
  }
}

class Mute {
  // Here we can increase the ammount of parameters dependant on how informative you want this class to be. For example you can parse the admin id, admin class, time of mute, etc. Only 3 parameters are fundamental that is the guild, target and the time of unmute. For this example i'll be refereancing to the target by their id, but you may choose to use guildMember, or even User class too.

  // As js nativly supports "longints" as a variable, I will choose to use the millisecond variant of times. You may wish to use a unixtimestamp, or even Date(), but the checking process needs to be adjusted for said changes.
  constructor(guild <id>, target <id>, timeofunmute <longint>) {
    this.guild = guild
    this.target = target
    this.unmuteTime = timeofunmute
  }
}

var gMutes = new Mutes()

// Here we having a running timer of a second. This is important checking for unmutes :D | If you care about code being executed before the function repeats itself, you may use setTimeout and call the async function whilst the code inside has finished. This is important when dealing with SQL queries, or API requests that may take longer than expected to return!
setInterval(() => {
  gMutes.checkMutes()
}, 1000)

// First we must make a listener for a command to be parsed, these are basic fillers, you may wish to have functions to parse arguments rather than sticking to @<user>, user object. Such an example would be to check for name correspondance, id and tags all in one function returning a user object.
<client>.on('message', message => {
  // Assuming you have all neccessary prechecks we must parse a minimum of 3 values to the function to mute. These must be formatted, retrieved by any means neccessary and adjustments can be made dependant on your coding preference / style.
  // We will be storing everything in memory for this snipet, but again, this can be changed / adapated to any storage system of your choosing. I will be using memory storage for this example.

  tryMute(<target>, <length>)
})

<client>.on('voiceStateUpdate', (oldMember, newMember) => {
  // Here we will be checking our memory, and by having proper permissions checks before hand, see wether to unmute to person. We should never be forcing <guildMember>.unmute | <guildMember>.mute in any other state!

  if (oldMember.voiceChannel === newMember.voiceChannel) return
  if (!newMember.voiceChannel) return

  // We will be checking all users that are past here to ensure that if they manage to slip, or an admin decides to unmute them, their mute gets re-applied.
  let filter = gMutes.findMutes(newMember.id)

  if (filter) {
    if (newMember.mute) {
      // Check you must check all permissions!!!! This is the most crutial part in-order to not override any channel specific permissions that are applied on-top of muting someone. This is important in-order that they do not get unmuted in a channel where they're not allowed to talk in the first place!

      // We simply remove them from our class Mutes, and if they're allowed to speak normally in said channel, we can now properly use the .unmute method on that <guildMember>
      unmute(<index>)
    } else {
      // Reapply mutes that have been avoided some-how /shrug
      newMember.setMute(true)
    }
  }
})

function tryMute(<targetId>, <length>) {
  // Here we will have neccessary pre-muting checks in-order to find wether the target is currently in a VC, permissions checks and other things that can break your code :P
  gMutes.addMute(new Mute(targetId, length))
}

function tryUnmute(<targetId>) {
  // Here we will again use a function to check permissions in that channel. If they do not meet the requirements to get un-muted, then they'll properly get unmuted in our 'voiceStateUpdate' event listener. This is only here as a addition so users don't need to move in / out of channels to get unmuted in a channel they already have permission to talk to. 'TEMP CHANNEL' hahahahahaha.

  // Permission checks
  unmute(<index>)
}

function unmute(<index>) {
  let guild = <client>.guilds.get(gMutes.getMute(index).guild)

  if (guild) {
    let guildMember = guild.member(gMutes.getMute(index).target)

    if (guildMember) {
      guildMember.setMute(false)
      gMutes.deleteMute(<index>)
    }
  }
}
