export const getLinkColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case "github":
        return "bg-[#1A1A1A] text-white";
      case "youtube":
        return "bg-[#EE3939] text-white";
      case "linkedin":
        return "bg-[#2D68FF] text-white";
      case "twitter":
        return "bg-[#43B7E9] text-white";
      case "frontend mentor":
        return "bg-[#FFFFFF] text-[#333333]";
      case "facebook":
        return "bg-[#2442AC] text-white";
      case "twitch":
        return "bg-[#EE3FC8] text-white";
      case "dev.to":
        return "bg-[#333333] text-white";
      case "codewars":
        return "bg-[#8A1A50] text-white";
      case "freecodecamp":
        return "bg-[#302267] text-white";
      case "gitlab":
        return "bg-[#EB4925] text-white";
      case "hashnode":
        return "bg-[#0330D1] text-white";
      case "stack overflow":
        return "bg-[#EC7100] text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };