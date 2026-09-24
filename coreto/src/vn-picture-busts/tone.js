function tintVnBusts(args, tone) {
    eachVnPicture(args.PictureID, picture => picture.tint(tone, args.Duration));
}
