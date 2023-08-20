import { IAvatar } from "./IAvatar";

const Avatar = (props: IAvatar) => {
  return (
    <div className="flex flex-row">
      <div className="flex items-center">
        <img
            className="ml-3 max-h-8 max-w-8 rounded-full"
            src={props.imageUrl}
          />
      </div>
    </div>
  );
}
export default Avatar;