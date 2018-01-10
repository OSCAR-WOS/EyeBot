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
    this.array = []
  }

  addMute(mute) {
    this.array.push(mute)
  }

  deleteMute(index) {
    try {
      this.array.splice(index, 1)

      return true
    } catch (e) {
      return e
    }
  }
}

class Mute {
  // Here we can increase the ammount of parameters dependant on how informative you want this class to be. For example you can parse the admin id, admin class, time of mute, etc. Only 2 parameters are fundamental that is the target and the time of unmute. For this example i'll be refereancing to the target by their id, but you may choose to use guildMember, or even User class too.

  // As js nativly supports "longints" as a variable, I will choose to use the millisecond variant of times. You may wish to use a unixtimestamp, or even Date(), but the checking process needs to be adjusted for said changes.
  constructor(target <id>, timeofunmute <longint>) {
    this.target = target
    this.unmuteTime = timeofunmute
  }
}

var gMutes = new Mutes()

// Here we having a running timer of a second. This is important checking for unmutes :D | If you care about code being executed before the function repeats itself, you may use setTimeout and call the async function whilst the code inside has finished. This is important when dealing with SQL queries, or API requests that may take longer than expected to return!
setInterval(() => {

}, 1000)

// First we must make a listener for a command to be parsed, these are basic fillers, you may wish to have functions to parse arguments rather than sticking to @<user>, user object. Such an example would be to check for name correspondance, id and tags all in one function returning a user object.
<client>.on("message", message => {
  // Assuming you have all neccessary prechecks we must parse a minimum of 3 values to the function to mute. These must be formatted, retrieved by any means neccessary and adjustments can be made dependant on your coding preference / style.
  // We will be storing everything in memory for this snipet, but again, this can be changed / adapated to any storage system of your choosing. I will be using memory storage for this example.


})

function tryMute() {
  // Here we will have neccessary pre-muting checks in-order to find wether the target is currently in a VC, permissions checks and other things that can break your code :P
}
