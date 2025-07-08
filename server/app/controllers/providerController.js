import ServiceProvider from "../models/ServiceProvider.js";
import User from "../models/User.js";

export const createOrUpdateProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { services, location, availability, bio, charges } = req.body;

    const profilePicPath = req.file
      ? `/uploads/profilePics/${req.file.filename}`
      : undefined;

    // Update user profile pic if provided
    await User.findByIdAndUpdate(userId, {
      ...(profilePicPath && { profilePic: profilePicPath }),
    });

    let provider = await ServiceProvider.findOne({ user: userId });

    if (provider) {
      // Update existing
      provider.services = services;
      provider.location = location;
      provider.availability = availability;
      provider.bio = bio;
      provider.charges = charges;

      await provider.save();

      // ✅ Populate the user field after save
      provider = await ServiceProvider.findById(provider._id).populate(
        "user",
        "name email profilePic"
      );

      return res.status(200).json({ message: "Profile updated", provider });
    } else {
      // Create new
      provider = await ServiceProvider.create({
        user: userId,
        services,
        location,
        availability,
        bio,
        charges,
      });

      // ✅ Populate the user field after create
      provider = await ServiceProvider.findById(provider._id).populate(
        "user",
        "name email profilePic"
      );

      return res.status(201).json({ message: "Profile created", provider });
    }
  } catch (err) {
    console.error("Provider profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const { location, category, search } = req.query;

    const filter = {};

    if (location) filter.location = location;
    if (category) filter.services = { $in: [category] };

    // If "search" is provided: match bio, services, or user name
    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive

      filter.$or = [{ bio: regex }, { location: regex }, { services: regex }];
    }

    const providers = await ServiceProvider.find(filter).populate(
      "user",
      "name email profilePic"
    );

    res.status(200).json(providers);
  } catch (err) {
    console.error("Error fetching providers:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get provider by ID

export const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await ServiceProvider.findById(id).populate(
      "user",
      "name email profilePic"
    );

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json(provider);
  } catch (err) {
    console.error("Error fetching provider by ID:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProviderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const provider = await ServiceProvider.findOne({ user: userId }).populate(
      "user",
      "name email profilePic"
    );

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json(provider);
  } catch (err) {
    console.error("Error fetching provider by User ID:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
