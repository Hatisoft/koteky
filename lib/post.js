'use strict'

class post{
    constructor(date, origin, owner)
    {
        this.date = date;
        this.origin = origin;
        this.owner = owner;
    }

    get date() {
      return this.date;
    }

    get origin() {
      return this.origin;
    }

    get owner() {
      return this.origin;
    }
}
