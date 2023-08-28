import SpaceUI from './SpaceUI';

export default async function Space() {
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="justify-between max-w-lg mt-100">
          <SpaceUI />
        </div>
      </div>
    );
  }