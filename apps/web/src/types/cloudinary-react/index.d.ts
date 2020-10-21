declare module "cloudinary-react" {
  type CropMode =
    | string
    | "scale"
    | "fit"
    | "limit"
    | "mfit"
    | "fill"
    | "lfill"
    | "pad"
    | "lpad"
    | "mpad"
    | "crop"
    | "thumb"
    | "imagga_crop"
    | "imagga_scale";
  type Gravity =
    | string
    | "north_west"
    | "north"
    | "north_east"
    | "west"
    | "center"
    | "east"
    | "south_west"
    | "south"
    | "south_east"
    | "xy_center"
    | "face"
    | "face:center"
    | "face:auto"
    | "faces"
    | "faces:center"
    | "faces:auto"
    | "body"
    | "body:face"
    | "adv_face"
    | "adv_faces"
    | "adv_eyes"
    | "custom"
    | "custom:face"
    | "custom:faces"
    | "custom:adv_face"
    | "custom:adv_faces"
    | "auto"
    | "auto:adv_face"
    | "auto:adv_faces"
    | "auto:adv_eyes"
    | "auto:body"
    | "auto:face"
    | "auto:faces"
    | "auto:custom_no_override"
    | "auto:none";
  type ImageFileExtension =
    | string
    | "jpg"
    | "jpe"
    | "jpeg"
    | "jpc"
    | "jp2"
    | "j2k"
    | "wdp"
    | "jxr"
    | "hdp"
    | "png"
    | "gif"
    | "webp"
    | "bmp"
    | "tif"
    | "tiff"
    | "ico"
    | "pdf"
    | "ps"
    | "ept"
    | "eps"
    | "eps3"
    | "psd"
    | "svg"
    | "ai"
    | "djvu"
    | "flif";
  type VideoFileExtension = string | "webm" | "mp4" | "ogv" | "flv" | "m3u8";
  type Angle =
    | number
    | string
    | Array<number | string>
    | "auto_right"
    | "auto_left"
    | "ignore"
    | "vflip"
    | "hflip";
  type ColorSpace = string | "srgb" | "no_cmyk";
  type ImageFlags =
    | string
    | Array<string>
    | "any_format"
    | "attachment"
    | "awebp"
    | "clip"
    | "cutter"
    | "force_strip"
    | "ignore_aspect_ratio"
    | "keep_iptc"
    | "layer_apply"
    | "lossy"
    | "preserve_transparency"
    | "png8"
    | "progressive"
    | "rasterize"
    | "region_relative"
    | "relative"
    | "strip_profile"
    | "text_no_trim"
    | "no_overflow"
    | "tiled";
  type VideoFlags =
    | string
    | Array<string>
    | "splice"
    | "layer_apply"
    | "no_stream"
    | "truncate_ts"
    | "waveform";
  type AudioCodec = string | "none" | "aac" | "vorbis" | "mp3";
  type AudioFrequency =
    | number
    | 8000
    | 11025
    | 16000
    | 22050
    | 32000
    | 37800
    | 44056
    | 44100
    | 47250
    | 48000
    | 88200
    | 96000
    | 176400
    | 192000;
  type StreamingProfiles =
    | string
    | "4k"
    | "full_hd"
    | "hd"
    | "sd"
    | "full_hd_wifi"
    | "full_hd_lean"
    | "hd_lean";

  import { HTMLProps } from "react";

  export interface CloudinaryComponentProps extends HTMLProps<any> {
    angle?: Angle;
    audioCodec?: AudioCodec;
    audioFrequency?: AudioFrequency;
    aspectRatio?: string | number | string;
    background?: string;
    bitRate?: number | string;
    border?: string;
    color?: string;
    colorSpace?: ColorSpace;
    crop?: CropMode;
    //customFunction: any; Can't find anything about this in core types
    //customPreFunction: any; Can't find anything about this in core types
    defaultImage?: string;
    delay?: string;
    density?: number | string;
    duration?: number | string;
    dpr?: number | string;
    effect?: string | Array<string | number>;
    else?: string;
    endIf?: string;
    endOffset?: number | string;
    fallbackContent?: string;
    fetchFormat?: ImageFileExtension;
    format?: ImageFileExtension;
    flags?: ImageFlags | string;
    gravity?: Gravity;
    fps?: string | Array<string | number>;
    height?: number | string;
    htmlHeight?: string;
    htmlWidth?: string;
    if?: string;
    keyframeInterval?: number;
    offset?: string;
    opacity?: number | string;
    overlay?: string | string;
    page?: number | string;
    poster?: string | Object;
    prefix?: string;
    quality?: string | number;
    radius?: number | string;
    rawTransformation?: any;
    size?: string;
    sourceTypes?: string;
    sourceTransformation?: string;
    startOffset?: number | string;
    streamingProfile?: StreamingProfiles;
    transformation?: Array<CloudinaryComponentProps>;
    underlay?: string;
    variable?: [string, any];
    variables?: Array<[string, any]>;
    videoCodec?: string | Object;
    videoSampling?: number | string;
    width?: string | number;
    x?: number | string;
    y?: number | string;
    zoom?: number | string;
    apiKey?: string;
    //apiSecret?: string; SHOULD NEVER BE USED IN FRONTEND
    //callback; Can't find anything about this in core types
    cdnSubdomain?: boolean;
    cloudName?: string;
    cname?: string;
    privateCdn?: boolean;
    protocol?: string;
    resourceType?: string;
    responsive?: boolean;
    responsiveClass?: string;
    responsiveUseBreakpoints?: boolean;
    responsiveWidth?: boolean;
    roundDpr?: boolean;
    secure?: boolean;
    secureCdnSubdomain?: boolean;
    secureDistribution?: boolean;
    shorten?: string;
    type?: string;
    urlSuffix?: string;
    useRootPath?: boolean;
    version?: string;
    publicId?: string;
  }

  export class CloudinaryComponent extends React.PureComponent<
    CloudinaryComponentProps,
    any
  > {}
  export class Image extends CloudinaryComponent {}
  export class Video extends CloudinaryComponent {}
  export class CloudinaryContext extends CloudinaryComponent {}
  export class Transformation extends CloudinaryComponent {}
}
