function preload() {
    this.load.image(backgroundName, backgroundPath);
    this.load.image(groundName, groundPath);
    this.load.spritesheet(parachuteName,
        parachutePath,
        {frameWidth: 32, frameHeight: 48});
    this.load.image(spotlightName, spotlightPath);

}