const UserProfile=()=>{
    return(
        <>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: "url('your-cover-image-url')" }}>
                <div className="flex justify-center">
                    <img
                        className="h-24 w-24 rounded-full border-4 border-white -mt-12"
                        src="your-profile-image-url"
                        alt="Profile"
                    />
                </div>
            </div>
            <div className="p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Jane Doe</h2>
                    <p className="text-gray-600">@janedoe</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Trekking Experience</h3>
                    <p className="mt-2 text-gray-600">
                        Experienced trekker with over 5 years of adventure in the mountains. Passionate about exploring new trails and sharing experiences with fellow trekkers.
                    </p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Favorite Treks</h3>
                    <ul className="mt-2 text-gray-600">
                        <li>- Everest Base Camp</li>
                        <li>- Annapurna Circuit</li>
                        <li>- Langtang Valley</li>
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Upcoming Treks</h3>
                    <ul className="mt-2 text-gray-600">
                        <li>- Manaslu Circuit</li>
                        <li>- Mardi Himal Trek</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
export default UserProfile;