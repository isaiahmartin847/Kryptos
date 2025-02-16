import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import State from "@/types/state";
import Species from "@/types/species";
import HuntingUnit from "@/types/huntingUnit";
import {
  fetchHuntingUnitBySpeciesID,
  fetchSpeciesByStateID,
  fetchStates,
} from "@/apiFunctions/getFunctions";
import { createSession } from "@/apiFunctions/postFunctions";
import { SessionPostBody } from "@/types/session";
import { useUser } from "@clerk/nextjs";

interface CreateSessionForm {
  State: number;
  Species: number;
  HuntingUnit: number;
}

const CreateSessionForm = () => {
  const { user } = useUser();
  const [stateID, setStateID] = useState<number | null>(null);
  const [speciesID, setSpeciesID] = useState<number | null>(null);
  const router = useRouter();

  const {
    data: states,
    isLoading: isStatesLoading,
    isError: isStatesError,
    error: StatesError,
  } = useQuery<State[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  const {
    data: species,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
    error: SpeciesError,
  } = useQuery<Species[], Error>({
    queryKey: ["species", stateID],
    queryFn: () => fetchSpeciesByStateID(stateID!),
    enabled: !!stateID,
  });

  const {
    data: units,
    isLoading: isUnitsLoading,
    isError: isUnitError,
    error: UnitError,
  } = useQuery<HuntingUnit[], Error>({
    queryKey: ["huntingUnits", speciesID],
    queryFn: () => fetchHuntingUnitBySpeciesID(speciesID!),
    enabled: !!speciesID,
  });

  const {
    mutate,
    isPending,
    isError: isCreateError,
  } = useMutation({
    mutationFn: (data: SessionPostBody) => createSession(data),
    onSuccess: (data) => {
      router.push(`/p/${data.id}`);
    },
    onError: (error) => {
      // Handle error
      console.error("Error creating session:", error);
    },
  });

  const form = useForm<CreateSessionForm>({
    defaultValues: {
      State: 0,
      Species: 0,
      HuntingUnit: 0,
    },
  });

  const onSubmit = (values: CreateSessionForm) => {
    if (!user) {
      throw new Error(
        "User does not exist. Please ensure the user is logged in."
      );
    }

    const postData: SessionPostBody = {
      UserID: user.id,
      StateID: values.State,
      SpeciesID: values.Species,
      HuntingUnitID: values.HuntingUnit,
    };

    mutate(postData);
  };

  if (isStatesError || isSpeciesError || isUnitError || isCreateError) {
    return (
      <div>
        <h1>Error Occurred</h1>
        {StatesError && <p>State Error: {StatesError.message}</p>}
        {SpeciesError && <p>Species Error: {SpeciesError.message}</p>}
        {UnitError && <p>Unit Error: {UnitError.message}</p>}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        {/* State Selector */}
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const numericValue = parseInt(value, 10);
                    field.onChange(numericValue);
                    setStateID(numericValue);
                    setSpeciesID(null);
                    form.setValue("Species", 0);
                    form.setValue("HuntingUnit", 0);
                  }}
                  value={field.value.toString()}>
                  <SelectTrigger>
                    {isStatesLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading states...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a State" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {states?.map((state) => (
                      <SelectItem
                        value={state.ID.toString()}
                        key={state.ID}>
                        {state.FullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Species Selector */}
        <FormField
          control={form.control}
          name="Species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a species</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const numericValue = parseInt(value, 10);
                    field.onChange(numericValue);
                    setSpeciesID(numericValue);
                    form.setValue("HuntingUnit", 0);
                  }}
                  value={field.value.toString()}
                  disabled={!stateID || isSpeciesLoading}>
                  <SelectTrigger>
                    {isSpeciesLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading species...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a species" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {species?.map((species) => (
                      <SelectItem
                        value={species.ID.toString()}
                        key={species.ID}>
                        {species.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hunting Unit Selector */}
        <FormField
          control={form.control}
          name="HuntingUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a hunting unit</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(parseInt(value, 10));
                  }}
                  disabled={!speciesID || isUnitsLoading}
                  value={field.value.toString()}>
                  <SelectTrigger>
                    {isUnitsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading units...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a unit" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {units?.map((unit) => (
                      <SelectItem
                        value={unit.ID.toString()}
                        key={unit.ID}>
                        {unit.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            className="w-20"
            type="submit"
            variant={"secondary"}
            disabled={!stateID || !speciesID || !form.watch("HuntingUnit")}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSessionForm;
