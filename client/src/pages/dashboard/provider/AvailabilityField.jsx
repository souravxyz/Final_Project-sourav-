import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiClock, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useWatch } from "react-hook-form";

export default function AvailabilityField({
  fields,
  register,
  remove,
  append,
  control,
  setValue,
  darkMode = false,
}) {
  const watchedAvailability = useWatch({
    control,
    name: "availability",
  });

  const handleAddSlot = (dayIndex) => {
    const current = watchedAvailability?.[dayIndex]?.slots || [];
    const updated = [...current, { from: "09:00", to: "17:00" }];
    setValue(`availability.${dayIndex}.slots`, updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const current = watchedAvailability?.[dayIndex]?.slots || [];
    if (current.length <= 1) {
      toast.error("At least one slot required");
      return;
    }
    const updated = current.filter((_, i) => i !== slotIndex);
    setValue(`availability.${dayIndex}.slots`, updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleTimeChange = (dayIndex, slotIndex, field, value) => {
    const current = watchedAvailability?.[dayIndex]?.slots || [];
    const updated = current.map((slot, i) =>
      i === slotIndex ? { ...slot, [field]: value } : slot
    );
    setValue(`availability.${dayIndex}.slots`, updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleAddDay = () => {
    append({ day: "", slots: [{ from: "09:00", to: "17:00" }] });
    toast.success("Added new availability day");
  };

  const handleRemoveDay = (index) => {
    if (fields.length <= 1) {
      toast.error("At least one day is required");
      return;
    }
    remove(index);
    toast.success("Day removed");
  };

  return (
    <div>
      <label
        className={`block text-sm font-medium ${
          darkMode ? "text-purple-300" : "text-purple-600"
        } mb-2`}
      >
        Availability Schedule
      </label>

      <div className="space-y-4">
        {(watchedAvailability || []).map((item, dayIndex) => (
          <motion.div
            key={fields[dayIndex]?.id || dayIndex}
            className={`p-4 rounded-lg border ${
              darkMode
                ? "bg-gray-700/50 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
              {/* Day Selector */}
              <select
                {...register(`availability.${dayIndex}.day`, {
                  required: true,
                })}
                className={`rounded-lg px-3 py-2 col-span-1 border focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                defaultValue={item?.day || ""}
              >
                <option value="">Select day</option>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              {/* Time Slots */}
              <div className="col-span-2">
                <label
                  className={`block text-xs mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Time Slots
                </label>
                <div className="space-y-2">
                  {(item?.slots || []).map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-2">
                      <input
                        type="time"
                        value={slot.from}
                        onChange={(e) =>
                          handleTimeChange(
                            dayIndex,
                            slotIndex,
                            "from",
                            e.target.value
                          )
                        }
                        className={`rounded-lg px-2 py-2 border w-28 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                      />
                      <span className="text-sm">to</span>
                      <input
                        type="time"
                        value={slot.to}
                        onChange={(e) =>
                          handleTimeChange(
                            dayIndex,
                            slotIndex,
                            "to",
                            e.target.value
                          )
                        }
                        className={`rounded-lg px-2 py-2 border w-28 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                        className={`p-1 ${
                          darkMode
                            ? "text-gray-400 hover:text-red-400"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Time Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => handleAddSlot(dayIndex)}
                  className={`flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-lg w-full transition-colors ${
                    darkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <FiPlus size={14} />
                  Add Time
                </button>
              </div>
            </div>

            {/* Remove Day Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveDay(dayIndex)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  darkMode
                    ? "bg-red-600/50 hover:bg-red-600 text-white"
                    : "bg-red-100 hover:bg-red-200 text-red-800"
                }`}
              >
                <FiTrash2 size={14} />
                Remove Day
              </button>
            </div>
          </motion.div>
        ))}

        {/* Add Day Button */}
        <motion.button
          type="button"
          onClick={handleAddDay}
          className={`w-full px-4 py-3 rounded-lg border border-dashed flex items-center justify-center gap-2 transition-colors ${
            darkMode
              ? "bg-gray-700/50 hover:bg-gray-700 border-gray-600 text-white"
              : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <FiPlus size={18} />
          Add Another Day
        </motion.button>
      </div>
    </div>
  );
}
