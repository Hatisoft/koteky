class fakeSNpost extends post{
    constructor(date, origin, owner, imgage)
    {
        Super(date, origin, owner)
        this.image = image;
    }

    get image() {
      return this.image;
    }
}
