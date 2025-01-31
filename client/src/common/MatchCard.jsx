import React from "react";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import lindaProfile from "../assets/lindagarcia.png";
import michaelProfile from "../assets/michaelbrown.png";
import robertProfile from "../assets/robertsmith.png";
import autoprofile from "../assets/autoprofile.png";

const MatchCard = ({ match, compact, selfView }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("attemping matching submit"); //testing
    console.log("mentor", match.mentorId);
    console.log("mentee", user.id);
    // navigate("/chat", { state: { match: match } }); //remove later
    // console.log(formData); //testing

    try {
      const response = await fetch("http://localhost:5000/addMenteeToMentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mentorId: match.mentorId, userId: user.id }),
        // body: JSON.stringify({
        //   menteeId: "6732d1e474bfa2e4f82b0db2",
        //   mentorId: "6732d20c74bfa2e4f82b0db7",
        // }),
      });
      console.log(response);
      if (!response.ok) {
        // const errorData = await response.json();
        // throw new Error(errorData.message || "Matching failed");
      } else {
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex rounded-3xl shadow-lg bg-[#E3E0E0] w-full mb-6">
      <div className="bg-[#B89C75] w-1/4 p-4 rounded-l-3xl flex items-center justify-center">
        {(() => {
          switch (match.name) {
            case "Linda Garcia":
              return (
                <img
                  src={lindaProfile}
                  alt="Profile"
                  className="rounded-full object-cover bg-white"
                />
              );
            case "Robert Smith":
              return (
                <img
                  src={robertProfile}
                  alt="Profile"
                  className="rounded-full object-cover bg-white"
                />
              );
            case "Michael Brown":
              return (
                <img
                  src={michaelProfile}
                  alt="Profile"
                  className="rounded-full object-cover bg-white"
                />
              );
            default:
              return (
                <img
                  src={autoprofile}
                  alt="Profile"
                  className="rounded-full object-cover bg-white"
                />
              );
          }
        })()}

        {/* <ProfilePicture imgUrl={match.imgUrl} altText={match.name} /> */}
      </div>

      <div className="w-3/4 h-70 flex flex-col justify-between pl-4 py-6">
        <h2 className="text-3xl font-bold">{match.name}</h2>

        {compact ? (
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Role:</span>{" "}
              {match.mentorId ? "Mentor" : "Mentee"}
            </p>{" "}
            <p className="text-gray-600">
              <span className="font-bold">Headline:</span> {match.headline}
            </p>
            {selfView ? (
              <div></div>
            ) : (
              <div className="text-right py-2">
                <button
                  className="px-3 py-1 text-lg text-white bg-[#1F2839] rounded-full flex items-center hover:bg-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
                  onClick={() => handleSubmit()}
                >
                  {match.mentorId ? "Connect with Mentor" : "Accept Request"}{" "}
                  <span className="ml-1"></span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <div className="flex items-center">
                  <span className="font-bold">Headline:</span>{" "}
                  {(() => {
                    switch (match.name) {
                      case "Linda Garcia":
                        return <div> Cybersecurity Expert</div>;
                      case "Robert Smith":
                        return <div> Data Science Mentor</div>;
                      case "Michael Brown":
                        return <div> Marketing and Strategy Mentor</div>;
                      default:
                        return <div> Mentor</div>;
                    }
                  })()}
                </div>
                <p>
                  <span className="font-bold">Role:</span>{" "}
                  {match.mentorId ? "Mentor" : "Mentee"}
                </p>
                <p>
                  <span className="font-bold">Career Field:</span>{" "}
                  {match.fields.join(", ")}
                </p>
                <p>
                  <span className="font-bold">Industry:</span>{" "}
                  {match.industries}
                </p>
              </div>
              <div className="w-1/2">
                <p>
                  <span className="font-bold">Personality:</span>{" "}
                  {match.personalityType}
                </p>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {match.location.city}, {match.location.state}
                </p>
                <p>
                  <span className="font-bold">College:</span> {match.university}
                </p>
                <p>
                  <span className="font-bold">Language:</span>{" "}
                  {match.languages.join(", ")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() =>
                  navigate("/ViewingProfile", { state: { user: match } })
                }
                className="text-blue-600 flex items-center hover:underline"
              >
                View more <span className="ml-1"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
